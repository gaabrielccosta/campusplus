package br.ucs.campusPlus.controller;

import br.ucs.campusPlus.dto.CreatePostDTO;
import br.ucs.campusPlus.dto.CreateTopicDTO;
import br.ucs.campusPlus.entity.Postagem;
import br.ucs.campusPlus.entity.TopicoForum;
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
    public List<TopicoForum> listTopics() {
        return service.getAllTopics();
    }

    @PostMapping
    public TopicoForum createTopic(@RequestBody CreateTopicDTO dto) {
        return service.createTopic(dto);
    }

    @PostMapping("/{id}/posts")
    public Postagem reply(@PathVariable Long id, @RequestBody CreatePostDTO dto) {
        return service.addReply(id, dto);
    }
}