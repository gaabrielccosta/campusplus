import React, { useState, FormEvent } from 'react';

// Interfaces for TypeScript
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

// Main Forum Page Component
const ForumPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // Form state for new topic
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');

  // Form state for replies
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyContent, setReplyContent] = useState('');

  // Handler to create a new topic
  const handleCreateTopic = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newContent.trim()) {
      return; // Could show validation message
    }
    const topicId = topics.length + 1;
    const firstPost: Post = {
      id: 1,
      author: newAuthor.trim(),
      content: newContent.trim(),
      createdAt: new Date(),
    };
    const newTopic: Topic = { id: topicId, title: newTitle.trim(), posts: [firstPost] };
    setTopics([...topics, newTopic]);
    // Reset form
    setNewTitle('');
    setNewAuthor('');
    setNewContent('');
  };

  // Handler to add a reply
  const handleAddReply = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTopic || !replyAuthor.trim() || !replyContent.trim()) {
      return;
    }
    const updatedTopics = topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        const newPost: Post = {
          id: topic.posts.length + 1,
          author: replyAuthor.trim(),
          content: replyContent.trim(),
          createdAt: new Date(),
        };
        return { ...topic, posts: [...topic.posts, newPost] };
      }
      return topic;
    });
    setTopics(updatedTopics);

    // Update selectedTopic to reflect new reply
    const updated = updatedTopics.find(t => t.id === selectedTopic.id) || null;
    setSelectedTopic(updated);

    setReplyAuthor('');
    setReplyContent('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1>Fórum</h1>

      {!selectedTopic ? (
        <>
          {/* Create New Topic Form */}
          <section style={{ marginBottom: '2rem' }}>
            <h2>Criar Novo Tópico</h2>
            <form onSubmit={handleCreateTopic} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                  <li key={topic.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '0.5rem' }}>
                    <a
                      href="#"
                      onClick={e => { e.preventDefault(); setSelectedTopic(topic); }}
                      style={{ fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none' }}
                    >
                      {topic.title}
                    </a>
                    <p style={{ margin: '0.25rem 0' }}>
                      {topic.posts.length} {topic.posts.length === 1 ? 'mensagem' : 'mensagens'}
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
          <button onClick={() => setSelectedTopic(null)} style={{ marginBottom: '1rem' }}>&larr; Voltar</button>
          <h2>{selectedTopic.title}</h2>
          <div>
            {selectedTopic.posts.map(post => (
              <div key={post.id} style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
                <p><strong>{post.author}</strong> em {post.createdAt.toLocaleString()}</p>
                <p>{post.content}</p>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <section style={{ marginTop: '1rem' }}>
            <h3>Responder</h3>
            <form onSubmit={handleAddReply} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
