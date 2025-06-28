import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ChatMessage, LawyerProfile, UserRole } from '../types'; // Assuming LawyerProfile type
import { LoadingSpinner } from '../components/ui/LoadingSpinner';


// Mock data for available lawyers
const MOCK_LAWYERS: LawyerProfile[] = [
  { id: 'lawyer1', name: 'Ana Pérez', email: 'ana@example.com', role: UserRole.LAWYER, specializations: ['Laboral', 'Civil'], availability: 'ONLINE', bio: 'Experta en derecho laboral.', yearsOfExperience: 10, profilePictureUrl: 'https://picsum.photos/seed/anaperez/100/100' },
  { id: 'lawyer2', name: 'Carlos López', email: 'carlos@example.com', role: UserRole.LAWYER, specializations: ['Mercantil'], availability: 'BUSY', bio: 'Especialista en derecho mercantil.', yearsOfExperience: 15, profilePictureUrl: 'https://picsum.photos/seed/carloslopez/100/100' },
  { id: 'lawyer3', name: 'Laura Gómez', email: 'laura@example.com', role: UserRole.LAWYER, specializations: ['Familia'], availability: 'OFFLINE', bio: 'Dedicada al derecho de familia.', yearsOfExperience: 8, profilePictureUrl: 'https://picsum.photos/seed/lauragomez/100/100' },
  { id: 'lawyer4', name: 'Pedro Martinez', email: 'pedro@example.com', role: UserRole.LAWYER, specializations: ['Penal', 'Civil'], availability: 'ONLINE', bio: 'Amplia experiencia en penal.', yearsOfExperience: 12, profilePictureUrl: 'https://picsum.photos/seed/pedromartinez/100/100' },
];

const LawyerStatusIndicator: React.FC<{ status: 'ONLINE' | 'OFFLINE' | 'BUSY' }> = ({ status }) => {
  let bgColor = 'bg-gray-400';
  if (status === 'ONLINE') bgColor = 'bg-green-500';
  else if (status === 'BUSY') bgColor = 'bg-yellow-500';
  return <span className={`inline-block w-3 h-3 ${bgColor} rounded-full mr-2`}></span>;
};

const ChatIcon: React.FC<{className?: string}> = ({ className = "w-12 h-12 text-iusven-blue" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-3.86 8.25-8.625 8.25S3.75 16.556 3.75 12 7.61 3.75 12.375 3.75 21 7.444 21 12Z" />
    </svg>
);


export const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);
  const [availableLawyers, setAvailableLawyers] = useState<LawyerProfile[]>([]);
  const [isLoadingLawyers, setIsLoadingLawyers] = useState(true);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Simulate fetching available lawyers
    setTimeout(() => {
      setAvailableLawyers(MOCK_LAWYERS);
      setIsLoadingLawyers(false);
    }, 1000);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user || !selectedLawyer) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: selectedLawyer.id,
      text: newMessage,
      timestamp: new Date(),
    };
    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate lawyer's response
    setTimeout(() => {
      if (selectedLawyer && user) { // Add null check for selectedLawyer and user
        const lawyerResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: selectedLawyer.id,
          receiverId: user.id,
          text: `Gracias por su mensaje, ${user.name}. Estoy revisando su consulta.`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, lawyerResponse]);
      }
    }, 1500);
  };
  
  const startChatWithLawyer = (lawyer: LawyerProfile) => {
    if (lawyer.availability === 'OFFLINE') {
        alert(`${lawyer.name} no está disponible en este momento.`);
        return;
    }
    setSelectedLawyer(lawyer);
    setMessages([]); // Clear previous chat messages
    // Simulate loading initial messages or a welcome message
    setTimeout(() => {
        if (user) { // Add null check for user
             setMessages([{
                id: 'welcome',
                senderId: lawyer.id,
                receiverId: user.id,
                text: `Hola ${user.name}, soy ${lawyer.name}. ¿En qué puedo ayudarte hoy?`,
                timestamp: new Date()
            }]);
        }
    }, 500);
  };


  if (!user) return <div className="p-8 text-center">Debe iniciar sesión para chatear.</div>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-iusven-gray">
      {/* Lawyers List Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-iusven-blue mb-4">Abogados Disponibles</h2>
        {isLoadingLawyers ? <LoadingSpinner /> : (
          <ul className="space-y-3">
            {availableLawyers.map((lawyer) => (
              <li key={lawyer.id}>
                <button
                  onClick={() => startChatWithLawyer(lawyer)}
                  disabled={lawyer.availability === 'OFFLINE'}
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-colors duration-150
                    ${selectedLawyer?.id === lawyer.id ? 'bg-iusven-blue text-white shadow-md' : 'hover:bg-gray-100'}
                    ${lawyer.availability === 'OFFLINE' ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <img src={lawyer.profilePictureUrl || `https://picsum.photos/seed/${lawyer.id}/40/40`} alt={lawyer.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <span className="font-medium block">{lawyer.name}</span>
                    <div className="flex items-center text-xs">
                        <LawyerStatusIndicator status={lawyer.availability} />
                        {lawyer.availability}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col p-0 md:p-1 h-[calc(100vh-160px)] md:h-[calc(100vh-80px)]"> {/* Adjusted height for mobile and header, footer space */}
        {selectedLawyer ? (
          <>
            <div className="bg-white p-4 border-b border-gray-200 flex items-center shadow-sm">
                <img src={selectedLawyer.profilePictureUrl || `https://picsum.photos/seed/${selectedLawyer.id}/40/40`} alt={selectedLawyer.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <h3 className="text-lg font-semibold text-iusven-blue">{selectedLawyer.name}</h3>
                    <p className="text-xs text-gray-500">{selectedLawyer.specializations.join(', ')}</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow ${
                    msg.senderId === user.id 
                    ? 'bg-iusven-blue text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === user.id ? 'text-blue-200' : 'text-gray-400'} text-right`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-gray-200 flex items-center">
              <Input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escriba su mensaje..."
                className="flex-1 !mb-0" // Override default margin bottom from Input component
                containerClassName="flex-1 !mb-0 mr-3"
              />
              <Button type="submit" size="md">Enviar</Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <ChatIcon className="w-16 h-16 text-iusven-blue opacity-50 mb-4" /> 
            <h2 className="text-2xl font-semibold text-iusven-blue mt-4">Bienvenido al Chat</h2>
            <p className="text-gray-600 mt-2">Seleccione un abogado de la lista para iniciar una conversación.</p>
          </div>
        )}
      </div>
    </div>
  );
};
