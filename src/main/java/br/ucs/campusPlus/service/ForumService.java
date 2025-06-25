package br.ucs.campusPlus.service;

import br.ucs.campusPlus.dto.CreatePostDTO;
import br.ucs.campusPlus.dto.CreateTopicDTO;
import br.ucs.campusPlus.entity.MensagemChat;
import br.ucs.campusPlus.entity.TopicoForum;
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

    public List<TopicoForum> getAllTopics() {
        return topicRepo.findAll();
    }

    @Transactional
    public TopicoForum createTopic(CreateTopicDTO dto) {
        TopicoForum topic = new TopicoForum();
        topic.setTitle(dto.getTitle());
        MensagemChat first = new MensagemChat();
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
    public MensagemChat addReply(Long topicId, CreatePostDTO dto) {
        TopicoForum topic = topicRepo.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Tópico não encontrado"));
        MensagemChat post = new MensagemChat();
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
