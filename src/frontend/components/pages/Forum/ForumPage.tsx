import React, { useState, useEffect, FormEvent } from 'react';
import api from '../../../services/api';

// Interfaces para TypeScript
interface Post {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
}

interface Topic {
  id: number;
  title: string;
  posts: Post[];
}

// DTOs para chamadas à API
interface CreateTopicDTO {
  title: string;
  author: string;
  content: string;
}

interface CreatePostDTO {
  author: string;
  content: string;
}

const ForumPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // Form state para novo tópico
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');

  // Form state para respostas
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyContent, setReplyContent] = useState('');

  // 1) fetchTopics: carrega todos os tópicos no mount
  useEffect(() => {
  const fetchTopics = async () => {
    try {
      const res = await api.get<Topic[]>('/topics');
      // res.data já é Topic[]
      const topicsFromApi = res.data.map(topic => ({
        id: topic.id,
        title: topic.title,
        posts: topic.posts.map(post => ({
          id: post.id,
          author: post.author,
          content: post.content,
          createdAt: new Date(post.createdAt),
        })),
      }));
      setTopics(topicsFromApi);
    } catch (err) {
      console.error('Erro ao carregar tópicos:', err);
    }
  };
  fetchTopics();
}, []);



  // 2) criar novo tópico
  const handleCreateTopic = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newContent.trim()) return;

    const dto: CreateTopicDTO = {
      title: newTitle.trim(),
      author: newAuthor.trim(),
      content: newContent.trim(),
    };

    try {
      const res = await api.post<Topic>('/topics', dto, {
        headers: { 'Content-Type': 'application/json' },
      });
      // converter createdAt dos posts retornados
      const created = {
        ...res.data,
        posts: res.data.posts.map(post => ({
          ...post,
          createdAt: new Date(post.createdAt),
        })),
      };
      setTopics(prev => [...prev, created]);
      // reset form
      setNewTitle('');
      setNewAuthor('');
      setNewContent('');
    } catch (err) {
      console.error('Erro ao criar tópico:', err);
    }
  };

  // 3) adicionar resposta
  const handleAddReply = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTopic || !replyAuthor.trim() || !replyContent.trim()) return;

    const dto: CreatePostDTO = {
      author: replyAuthor.trim(),
      content: replyContent.trim(),
    };

    try {
      const res = await api.post<Post>(
        `/topics/${selectedTopic.id}/posts`,
        dto,
        { headers: { 'Content-Type': 'application/json' } }
      );
      // converter createdAt
      const newPost: Post = {
        ...res.data,
        createdAt: new Date(res.data.createdAt),
      };

      // atualizar lista de tópicos
      setTopics(prev =>
        prev.map(t =>
          t.id === selectedTopic.id
            ? { ...t, posts: [...t.posts, newPost] }
            : t
        )
      );
      // atualizar tópico selecionado
      setSelectedTopic(prev =>
        prev ? { ...prev, posts: [...prev.posts, newPost] } : prev
      );
      // reset form
      setReplyAuthor('');
      setReplyContent('');
    } catch (err) {
      console.error('Erro ao enviar resposta:', err);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1>Fórum</h1>

      {!selectedTopic ? (
        <>
          {/* Create New Topic Form */}
          <section style={{ marginBottom: '2rem' }}>
            <h2>Criar Novo Tópico</h2>
            <form
              onSubmit={handleCreateTopic}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <input
                type="text"
                placeholder="Título do tópico"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Seu nome"
                value={newAuthor}
                onChange={e => setNewAuthor(e.target.value)}
                required
              />
              <textarea
                placeholder="Conteúdo da mensagem"
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows={4}
                required
              />
              <button type="submit">Criar Tópico</button>
            </form>
          </section>

          {/* Topics List */}
          <section>
            <h2>Tópicos</h2>
            {topics.length === 0 ? (
              <p>Nenhum tópico criado ainda.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {topics.map(topic => (
                  <li
                    key={topic.id}
                    style={{
                      marginBottom: '1rem',
                      border: '1px solid #ccc',
                      padding: '0.5rem',
                    }}
                  >
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        setSelectedTopic(topic);
                      }}
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                      }}
                    >
                      {topic.title}
                    </a>
                    <p style={{ margin: '0.25rem 0' }}>
                      {topic.posts.length}{' '}
                      {topic.posts.length === 1 ? 'mensagem' : 'mensagens'}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : (
        <>
          {/* Thread View */}
          <button
            onClick={() => setSelectedTopic(null)}
            style={{ marginBottom: '1rem' }}
          >
            &larr; Voltar
          </button>
          <h2>{selectedTopic.title}</h2>
          <div>
            {selectedTopic.posts.map(post => (
              <div
                key={post.id}
                style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}
              >
                <p>
                  <strong>{post.author}</strong> em{' '}
                  {post.createdAt.toLocaleString()}
                </p>
                <p>{post.content}</p>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <section style={{ marginTop: '1rem' }}>
            <h3>Responder</h3>
            <form
              onSubmit={handleAddReply}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <input
                type="text"
                placeholder="Seu nome"
                value={replyAuthor}
                onChange={e => setReplyAuthor(e.target.value)}
                required
              />
              <textarea
                placeholder="Sua resposta"
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
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
