package br.ucs.campusPlus.repository;

import br.ucs.campusPlus.entity.MensagemChat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<MensagemChat, Long> {}

