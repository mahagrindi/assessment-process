package studio.farsighted.pfe.api.components;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.*;

@Component
public class CsvParser {

    public <T> List<T> parse(String path, Class<T> elementType) throws IOException {
        List<T> results = new ArrayList<>();
        Set<T> uniqueEntities = new HashSet<>();
        try (FileReader fileReader = new FileReader(path);
             CSVParser parser = CSVFormat.DEFAULT.withHeader().parse(fileReader)) {
            for (CSVRecord record : parser) {
                try {
                    T entity = convert(elementType, record);
                    if (uniqueEntities.add(entity)) {
                        results.add(entity);
                    }
                } catch (Exception e) {
                    throw new IOException("Error converting CSV record to entity: " + e.getMessage(), e);
                }
            }
        }
        return results;
    }

    private <T> T convert(Class<T> elementType, CSVRecord record) throws Exception {
        T instance = elementType.getDeclaredConstructor().newInstance();
        for (Map.Entry<String, String> entry : record.toMap().entrySet()) {
            setField(instance, entry.getKey(), entry.getValue());
        }
        return instance;
    }

    private <T> void setField(T entity, String fieldName, String value) throws IllegalAccessException {
        try {
            Field field = entity.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(entity, StringUtils.hasText(value) && "n.a.".equalsIgnoreCase(value.trim()) ? null : value);
        } catch (NoSuchFieldException e) {
            throw new IllegalArgumentException("Field '" + fieldName + "' not found in entity class " + entity.getClass().getName(), e);
        }
    }
}
