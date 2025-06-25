package br.ucs.campusPlus.repository;

import br.ucs.campusPlus.entity.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Postagem, Long> {}

