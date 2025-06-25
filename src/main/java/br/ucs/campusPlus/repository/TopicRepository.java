package br.ucs.campusPlus.repository;

import br.ucs.campusPlus.entity.TopicoForum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<TopicoForum, Long> {}
