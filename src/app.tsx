import { useEffect, useState } from 'preact/hooks';
import './app.css';

interface Guild {
  id: string;
  name: string;
  icon: string;
}

interface User {
  id: string;
  username: string;
}

export function App() {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      const guildsResponse = await fetch(`http://localhost:3000/api/guilds`, {
        credentials: 'include',
      });
      const guildsData = await guildsResponse.json();
      setGuilds(guildsData);

      const userResponse = await fetch("http://localhost:3000/api/user", {
        credentials: "include",
      });
      const userData = await userResponse.json();
      setUser(userData);
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="titles">
        <h1> Welcome, {user?.username} </h1>
        <h2> Please, choose guild:</h2>
        <hr className="title-divider" />
      </div>

      <div className="guilds-container">
        <div className="guilds-grid">
          {guilds.map((guild) => (
            <a
              key={guild.id}
              href={`/dashboard/servers/${guild.id}/home`}
              className="guild"
            >
              <div className="guild-item">
                <img
                  src={
                    guild.icon
                      ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                      : "/default-icon.png"
                  }
                  alt={guild.name}
                  width={80}
                  height={80}
                />

                <div className="guild-name">
                  {guild.name}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <button onClick={() => console.log('Sign out')} className="sign-out">
        Sign out
      </button>
    </div>
  );
}