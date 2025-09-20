import { Home, Compass, Bell, Mail, Bookmark, User, Settings, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Compass, label: "Explore" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

const trendingTopics = [
  { topic: "#IndiaDigital", posts: "12.5K posts" },
  { topic: "#TechIndia", posts: "8.2K posts" },
  { topic: "#StartupLife", posts: "5.1K posts" },
  { topic: "#Innovation", posts: "15.3K posts" },
];

const Sidebar = () => {
  return (
    <aside className="w-80 p-4 space-y-6">
      {/* Navigation */}
      <Card className="shadow-soft border-border/60">
        <CardContent className="p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start text-left font-medium ${
                  item.active 
                    ? "bg-gradient-primary text-primary-foreground shadow-primary hover:opacity-90" 
                    : "hover:bg-muted/70"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="shadow-soft border-border/60">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Trending in India</h3>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((trend, index) => (
              <div key={index} className="hover:bg-muted/50 p-2 rounded-md cursor-pointer transition-colors">
                <p className="font-medium text-primary hover:underline">{trend.topic}</p>
                <p className="text-sm text-muted-foreground">{trend.posts}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Users */}
      <Card className="shadow-soft border-border/60">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-4">Who to follow</h3>
          <div className="space-y-4">
            {[
              { name: "Priya Sharma", handle: "@priyatech", verified: true },
              { name: "Rajesh Kumar", handle: "@rajeshk", verified: false },
              { name: "Anita Singh", handle: "@anitasingh", verified: true },
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gradient-secondary rounded-full flex items-center justify-center text-accent-foreground font-medium text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.handle}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;