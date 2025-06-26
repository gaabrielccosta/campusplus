import React, { useState, useEffect, FormEvent, useRef } from "react";
import api from "../../services/api";
import { UserResponse } from "../../types/UserResponse";

interface Postagem {
  id: number;
  author: string;
  role: string;
  curso?: string;
  departamento?: string;
  content: string;
  createdAt: Date;
}

interface Topic {
  id: number;
  title: string;
  posts: Postagem[];
}

interface CreateTopicDTO {
  title: string;
  author: string;
  role: string;
  curso?: string;
  departamento?: string;
  content: string;
}

interface CreatePostDTO {
  author: string;
  role: string;
  curso?: string;
  departamento?: string;
  content: string;
}

interface IForumPageProps {
  user: UserResponse | null;
}

const ForumPage: React.FC<IForumPageProps> = ({ user }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const selectedTopicRef = useRef<Topic | null>(null);

  // Form state para novo tópico
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Form state para respostas
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    // define aqui fora pra poder limpar depois
    const fetchTopics = async () => {
      try {
        const res = await api.get<Topic[]>("/topics");
        const topicsFromApi = res.data.map((topic) => ({
          id: topic.id,
          title: topic.title,
          posts: topic.posts.map((post) => ({
            id: post.id,
            author: post.author,
            content: post.content,
            role: post.role,
            curso: post.curso,
            departamento: post.departamento,
            createdAt: new Date(post.createdAt),
          })),
        }));

        console.log("O SELECTED TOPIC É", selectedTopic);
        const currentTopic = topicsFromApi.find(t => t.id === selectedTopic?.id);
        if (currentTopic && (!selectedTopicRef || !selectedTopicRef.current || JSON.stringify(selectedTopicRef.current) !== JSON.stringify(currentTopic))) {
          selectedTopicRef.current = currentTopic;
          setSelectedTopic(currentTopic);
        }

        setTopics(topicsFromApi);

      } catch (err) {
        console.error("Erro ao carregar tópicos:", err);
      }
    };

    // busca inicial imediata
    fetchTopics();

    // cria o polling a cada 1 segundo
    const intervalId = setInterval(fetchTopics, 1000);

    // cleanup ao desmontar ou quando selectedTopic mudar
    return () => clearInterval(intervalId);
  }, [selectedTopic]);

  // Criar novo tópico
  const handleCreateTopic = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !user?.authenticated) return;

    const dto: CreateTopicDTO = {
      title: newTitle.trim(),
      author: user?.user?.username!,
      role: user?.aluno ? "Aluno" : "Professor(a)",
      curso: user?.aluno?.curso,
      departamento: user?.professor?.departamento,
      content: newContent.trim(),
    };

    try {
      const res = await api.post<Topic>("/topics", dto);
      const created = {
        ...res.data,
        posts: res.data.posts.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt),
        })),
      };

      setTopics((prev) => [...prev, created]);
      setNewTitle("");
      setNewContent("");
    } catch (err) {
      console.error("Erro ao criar tópico:", err);
    }
  };

  // Adicionar resposta
  const handleAddReply = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTopic || !replyContent.trim() || !user?.authenticated) return;

    const dto: CreatePostDTO = {
      author: user?.user?.username!,
      role: user?.aluno ? "Aluno" : "Professor(a)",
      curso: user?.aluno?.curso,
      departamento: user?.professor?.departamento,
      content: replyContent.trim(),
    };

    try {
      const res = await api.post<Postagem>(
        `/topics/${selectedTopic.id}/posts`,
        dto
      );
      const newPost: Postagem = {
        ...res.data,
        createdAt: new Date(res.data.createdAt),
      };

      setTopics((prev) =>
        prev.map((t) =>
          t.id === selectedTopic.id ? { ...t, posts: [...t.posts, newPost] } : t
        )
      );
      setSelectedTopic((prev) =>
        prev ? { ...prev, posts: [...prev.posts, newPost] } : prev
      );
      setReplyContent("");
    } catch (err) {
      console.error("Erro ao enviar resposta:", err);
    }
  };

  console.log(selectedTopic)
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <h1>Fórum</h1>

      {!user ? (
        <p>Você precisa estar logado para ver o fórum.</p>
      ) : !selectedTopic ? (
        <>
          <section style={{ marginBottom: "2rem" }}>
            <h2>Criar Novo Tópico</h2>
            <form
              onSubmit={handleCreateTopic}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <input
                type="text"
                placeholder="Título do tópico"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Conteúdo da mensagem"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                required
              />
              <button type="submit">Criar Tópico</button>
            </form>
          </section>

          <section>
            <h2>Tópicos</h2>
            {topics.length === 0 ? (
              <p>Nenhum tópico criado ainda.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {topics.map((topic) => (
                  <li
                    key={topic.id}
                    style={{
                      marginBottom: "1rem",
                      border: "1px solid #ccc",
                      padding: "0.5rem",
                    }}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTopic(topic);
                        console.log("cliquei")
                      }}
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                    >
                      {topic.title}
                    </a>
                    <p style={{ margin: "0.25rem 0" }}>
                      {topic.posts.length}{" "}
                      {topic.posts.length === 1 ? "mensagem" : "mensagens"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedTopic(null)}
            style={{ marginBottom: "1rem" }}
          >
            &larr; Voltar
          </button>
          <h2>{selectedTopic.title}</h2>
          <div>
            {selectedTopic.posts.map((post) => (
              <div
                key={post.id}
                style={{
                  borderBottom: "1px solid #eee",
                  padding: "0.5rem 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p>
                    <strong>{post.author}</strong> em{" "}
                    {post.createdAt.toLocaleString("pt-BR")}
                  </p>
                  <p style={{ marginTop: "-15px" }}>
                    {post.role} {post.curso ? ` - ${post.curso}` : ""}
                    {post.departamento ? ` - ${post.departamento}` : ""}
                  </p>
                </div>

                {/* aqui a mensagem com quebra automática */}
                <p
                  style={{
                    marginTop: "10px",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  Mensagem: {post.content}
                </p>
              </div>
            ))}
          </div>

          <section style={{ marginTop: "1rem" }}>
            <h3>Responder</h3>
            <form
              onSubmit={handleAddReply}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <textarea
                placeholder="Sua resposta"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={3}
                required
              />
              <button type="submit">Enviar Resposta</button>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default ForumPage;
