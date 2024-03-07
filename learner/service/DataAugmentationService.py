from transformers import GPT2LMHeadModel, set_seed

import re
import os
import torch
import pandas as pd

class DataAugmentationService:
    def __init__(self, tokenizer):
        set_seed(42)
        self.model = GPT2LMHeadModel.from_pretrained("gpt2-xl").to("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = tokenizer

    def clean_text(self, text):
        """
        Clean the text by removing extra spaces and newlines
        """
        text = text.lower()
        text = re.sub(r"\s+", " ", text)
        text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)  # Fix: Use re.sub instead of sub
        return text.strip()

    def generate_paraphrase(self, input, num_sequences=5):
        """
        Generate paraphrases using GPT-2
        """
        cleaned_text = self.clean_text(input)
        prompt = f"Paraphrase, this: {cleaned_text}"
        
        device = "cuda" if torch.cuda.is_available() else "cpu"  # Check for CUDA availability
        
        encoded_input = self.tokenizer.encode(prompt, return_tensors='pt').to(device)
        attention_mask = torch.ones_like(encoded_input)  # Create attention mask
        pad_token_id = self.tokenizer.eos_token_id  # Get pad token id
        
        outputs = self.model.generate(
            input_ids=encoded_input,
            attention_mask=attention_mask,  # Pass attention mask
            pad_token_id=pad_token_id,  # Set pad token id
            max_new_tokens=100,
            num_return_sequences=num_sequences,
            temperature=1.1,
            top_k=50,
            top_p=0.95,
            no_repeat_ngram_size=2,
            do_sample=True
        )

        paraphrases = []
        for output in outputs:
            paraphrase = self.tokenizer.decode(output, skip_special_tokens=True).replace(prompt, '').strip()
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
                obs_paraphrases = self.generate_paraphrase(row['OBS'], num_sequences=num_sequences)
                rec_paraphrases = self.generate_paraphrase(row['REC'], num_sequences=num_sequences)

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