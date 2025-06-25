package br.ucs.campusPlus.service;

import br.ucs.campusPlus.dto.CreatePostDTO;
import br.ucs.campusPlus.dto.CreateTopicDTO;
import br.ucs.campusPlus.entity.Post;
import br.ucs.campusPlus.entity.Topic;
import br.ucs.campusPlus.repository.PostRepository;
import br.ucs.campusPlus.repository.TopicRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ForumService {
    private final TopicRepository topicRepo;
    private final PostRepository postRepo;

    public ForumService(TopicRepository topicRepo, PostRepository postRepo) {
        this.topicRepo = topicRepo;
        this.postRepo = postRepo;
    }

    public List<Topic> getAllTopics() {
        return topicRepo.findAll();
    }

    @Transactional
    public Topic createTopic(CreateTopicDTO dto) {
        Topic topic = new Topic();
        topic.setTitle(dto.getTitle());
        Post first = new Post();
        first.setAuthor(dto.getAuthor());
        first.setRole(dto.getRole());
        first.setCurso(dto.getCurso());
        first.setDepartamento(dto.getDepartamento());
        first.setContent(dto.getContent());
        first.setCreatedAt(LocalDateTime.now());
        first.setTopic(topic);
        topic.getPosts().add(first);
        return topicRepo.save(topic);
    }

    @Transactional
    public Post addReply(Long topicId, CreatePostDTO dto) {
        Topic topic = topicRepo.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Tópico não encontrado"));
        Post post = new Post();
        post.setAuthor(dto.getAuthor());
        post.setRole(dto.getRole());
        post.setCurso(dto.getCurso());
        post.setDepartamento(dto.getDepartamento());
        post.setContent(dto.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setTopic(topic);
        return postRepo.save(post);
    }
}
