package br.ucs.campusPlus.controller;

import br.ucs.campusPlus.dto.CreatePostDTO;
import br.ucs.campusPlus.dto.CreateTopicDTO;
import br.ucs.campusPlus.entity.Post;
import br.ucs.campusPlus.entity.Topic;
import br.ucs.campusPlus.service.ForumService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class ForumController {
    private final ForumService service;

    public ForumController(ForumService service) {
        this.service = service;
    }

    @GetMapping
    public List<Topic> listTopics() {
        return service.getAllTopics();
    }

    @PostMapping
    public Topic createTopic(@RequestBody CreateTopicDTO dto) {
        return service.createTopic(dto);
    }

    @PostMapping("/{id}/posts")
    public Post reply(@PathVariable Long id, @RequestBody CreatePostDTO dto) {
        return service.addReply(id, dto);
    }
}