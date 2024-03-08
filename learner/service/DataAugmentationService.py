from transformers import AutoModelForSeq2SeqLM
from concurrent.futures import ProcessPoolExecutor, as_completed

import re
import os
import torch
import pandas as pd

class DataAugmentationService:
    def __init__(self, tokenizer):
        self.tokenizer = tokenizer
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = AutoModelForSeq2SeqLM.from_pretrained("humarin/chatgpt_paraphraser_on_T5_base").to(self.device)

    def clean_text(self, text):
        """
        Clean the text by removing extra spaces and newlines
        """
        if isinstance(text, str):
            text = text.lower()
            text = re.sub(r"\s+", " ", text)
            text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
            return text.strip()
        else:
            return str(text)

    def paraphrase(self, question, num_return_sequences=5):
        """
        Generate multiple paraphrases related to the input text using the provided model.
        """
        input_ids = self.tokenizer(
            f'paraphrase: {self.clean_text(question)}',
            return_tensors="pt", padding="longest",
            max_length=128,
            truncation=True,
        ).input_ids.to(self.device)
        
        outputs = self.model.generate(
            input_ids,
            max_length=128,
            temperature=0.7,
            repetition_penalty=10.0,
            diversity_penalty=3.0,
            no_repeat_ngram_size=2,
            num_return_sequences=num_return_sequences,
            num_beams=5,
            num_beam_groups=5,
            early_stopping=True
        )

        paraphrases = []
        for output in outputs:
            paraphrase = self.tokenizer.decode(output, skip_special_tokens=True)
            paraphrases.append(paraphrase)

        return paraphrases

    def augment_data(self, input_file_path, num_sequences=5):
        """
        Augment data for both 'OBS' and 'REC' columns in the dataset. Returns True if successful.
        """
        try:
            data = pd.read_csv(input_file_path)
            augmented_rows = []

            for index, row in data.iterrows():
                obs_paraphrases = self.paraphrase(row['OBS'], num_return_sequences=num_sequences)
                rec_paraphrases = self.paraphrase(row['REC'], num_return_sequences=num_sequences)

                # Add original text to the DataFrame
                row_with_original = row.copy()
                row_with_original['OBS'] = row['OBS']
                row_with_original['REC'] = row['REC']
                augmented_rows.append(row_with_original)

                for obs, rec in zip(obs_paraphrases, rec_paraphrases):
                    augmented_row = row.copy()
                    augmented_row['OBS'] = obs
                    augmented_row['REC'] = rec
                    augmented_rows.append(augmented_row)

            augmented_data = pd.DataFrame(augmented_rows)
            augmented_data.to_csv(os.path.join("..", "DB", "crates", "dataset.csv"), index=False)
            print("Augmented data saved.")
            return True
        except Exception as e:
            print(f"An error occurred: {e}")
            return False
