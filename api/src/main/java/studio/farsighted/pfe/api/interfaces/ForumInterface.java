package studio.farsighted.pfe.api.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import studio.farsighted.pfe.api.models.ForumEntity;

import java.util.UUID;

public interface ForumInterface {

    Page<ForumEntity> get(String query, Boolean status, Pageable page);

    ForumEntity find(UUID id);

    ForumEntity save(ForumEntity forumEntity);

    ForumEntity update(ForumEntity forumEntity);

    void delete(UUID id);
}
