package studio.farsighted.pfe.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import studio.farsighted.pfe.api.interfaces.ForumInterface;
import studio.farsighted.pfe.api.models.ForumEntity;
import studio.farsighted.pfe.api.repositories.ForumRepository;

import java.util.UUID;

@Service
public class ForumService implements ForumInterface {

    @Autowired
    private ForumRepository forumRepository;


    @Override
    public Page<ForumEntity> get(String query, Boolean status, Pageable page) {
        return forumRepository.findForumsByFilterCriteria(query, status, page);
    }

    @Override
    public ForumEntity find(UUID id) {
        return forumRepository.findById(id).get();
    }

    @Override
    public ForumEntity save(ForumEntity forumEntity) {
        if (forumEntity.getQuestions() != null) {
            forumEntity.getQuestions().forEach(question -> question.setForum(forumEntity));
        }
        return forumRepository.save(forumEntity);
    }

    @Override
    public ForumEntity update(ForumEntity forumEntity) {
        if (forumEntity.getQuestions() != null) {
            forumEntity.getQuestions().forEach(question -> question.setForum(forumEntity));
        }
        return forumRepository.save(forumEntity);
    }

    @Override
    public void delete(UUID id) {
        forumRepository.deleteById(id);
    }
}
