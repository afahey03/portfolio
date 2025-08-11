import os
import requests
import json
from datetime import datetime

REFRESH_TOKEN = os.environ.get("SPOTIFY_REFRESH_TOKEN")
CLIENT_ID = os.environ.get("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.environ.get("SPOTIFY_CLIENT_SECRET")

TOKEN_URL = "https://accounts.spotify.com/api/token"
NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing"

def get_new_access_token():
    """Gets a new access token using the refresh token."""
    response = requests.post(
        TOKEN_URL,
        data={
            "grant_type": "refresh_token",
            "refresh_token": REFRESH_TOKEN,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
        },
    )
    response.raise_for_status()
    return response.json()["access_token"]

def get_now_playing():
    """Fetches the currently playing song from Spotify."""
    access_token = get_new_access_token()
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(NOW_PLAYING_URL, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 204:
        return None
    else:
        response.raise_for_status()

def update_status_file(data):
    """Writes the song data to a JSON file."""
    if data and data['is_playing']:
        song_name = data["item"]["name"]
        artist_name = data["item"]["artists"][0]["name"]
        content = {
            "is_playing": True,
            "song_name": song_name,
            "artist_name": artist_name,
            "updated_at": datetime.now().isoformat(),
        }
    else:
        content = {"is_playing": False}
        
    with open("now-playing.json", "w") as f:
        json.dump(content, f, indent=2)

if __name__ == "__main__":
    song_data = get_now_playing()
    update_status_file(song_data)