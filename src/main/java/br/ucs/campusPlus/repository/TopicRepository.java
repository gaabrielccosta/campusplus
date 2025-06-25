package br.ucs.campusPlus.repository;

import br.ucs.campusPlus.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {}
