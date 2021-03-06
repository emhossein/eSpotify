import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroIcons/react/outline';
import { HeartIcon } from '@heroIcons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylist] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-xm lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:mx-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white ">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white ">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2  hover:text-white ">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white ">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Your Episode</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />
        {/* playlist */}
        {playlists.map(pl => (
          <p
            key={pl.id}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(pl.id)}
          >
            {pl.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
