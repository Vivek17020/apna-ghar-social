import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import FloatingActionButton from "@/components/FloatingActionButton";
import heroImage from "@/assets/hero-image.jpg";
import { useToast } from "@/hooks/use-toast";

const samplePosts = [
  {
    author: {
      name: "Priya Sharma",
      username: "priyatech",
      avatar: "",
    },
    content: "Just launched my new startup focused on digital payments for rural India! 🚀 Excited to bridge the digital divide and empower millions. #IndiaDigital #StartupLife",
    timestamp: "2h",
    likes: 124,
    comments: 18,
    isLiked: true,
  },
  {
    author: {
      name: "Rajesh Kumar",
      username: "rajeshk",
      avatar: "",
    },
    content: "The future of Indian technology is here! AI and machine learning are transforming how we work and live. What's your favorite AI tool? 🤖 #TechIndia #Innovation",
    timestamp: "4h",
    likes: 89,
    comments: 12,
  },
  {
    author: {
      name: "Anita Singh",
      username: "anitasingh",
      avatar: "",
    },
    content: "Celebrating the diversity of our beautiful country! 🇮🇳 From Kerala's backwaters to Rajasthan's deserts, every corner has a story to tell. Share your favorite Indian destination below! ⬇️",
    image: heroImage,
    timestamp: "6h",
    likes: 256,
    comments: 34,
  },
  {
    author: {
      name: "Dev Patel",
      username: "devpatel",
      avatar: "",
    },
    content: "Working late nights on an exciting new project. The Indian developer community is absolutely incredible - so much talent and passion! 💻 #CodeLife #IndianDevelopers",
    timestamp: "8h",
    likes: 67,
    comments: 9,
  },
];

const Index = () => {
  const { toast } = useToast();

  const handleFabClick = () => {
    // Scroll to create post section
    const createPostElement = document.querySelector('[data-create-post]');
    if (createPostElement) {
      createPostElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast({
      title: "✨ Ready to share?",
      description: "What's on your mind today?",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header />
      
      <main className="container mx-auto flex gap-6 pt-6 pb-12">
        {/* Main Content */}
        <div className="flex-1 max-w-2xl space-y-6">
          {/* Welcome Hero Section */}
          <div className="bg-gradient-sunset rounded-xl p-8 text-center shadow-primary hover-lift animate-fade-in">
            <div className="max-w-md mx-auto">
              <img 
                src={heroImage} 
                alt="Samvaad Community" 
                className="w-full h-48 object-cover rounded-lg mb-6 shadow-soft hover:scale-105 transition-transform duration-500"
              />
              <h1 className="text-3xl font-bold text-white mb-3 animate-fade-in-up">
                Welcome to Samvaad
              </h1>
              <p className="text-white/90 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Connect with India's vibrant community. Share your stories, discover new perspectives.
              </p>
            </div>
          </div>

          {/* Create Post */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }} data-create-post>
            <CreatePost />
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {samplePosts.map((post, index) => (
              <div 
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 0.2}s` }}
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleFabClick} />
    </div>
  );
};

export default Index;