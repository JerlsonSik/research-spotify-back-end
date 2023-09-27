from flask import Flask, request, url_for, session, redirect,render_template
from random import *
import spotipy
import spotipy.util as util
from spotipy.oauth2 import SpotifyOAuth, SpotifyClientCredentials
import time
import datetime
import sys

app = Flask(__name__)

app.secret_key = "0fs245122fs"
app.config['SESSION_COOKIE_NAME'] = 'Jasons Cookie'
TOKEN_INFO = "token_info"


@app.route('/') #This line will be execute first because of the URL 
def login(): 
    return redirect(url_for("redirectPage"))
    #return render_template("index.html")
    sp_oauth = create_spotify_oauth()
    # print("sp_oauth:",sp_oauth)
    auth_url = sp_oauth.get_authorize_url()
    print("Auth URL:",auth_url) #This auth URL is going to go into user account and then the spotify redirect app will redirect it to redirect page
    # return redirect("https://cyberball.empirisoft.com/web?cbe=614af0d6-cfa2-4db9-851a-7ea41c0d0c91&condition=1&pid=")
    return redirect(auth_url)

@app.route('/cyberball')
def cyberball():
    return redirect("https://cyberball.empirisoft.com/web?cbe=614af0d6-cfa2-4db9-851a-7ea41c0d0c91&condition=1&pid=")


@app.route('/redirect')
def redirectPage():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)
    
@app.route('/account')
def account():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    session.clear()
    code = request.args.get('code')
    print("Code:",code)
    token_info = sp_oauth.get_access_token(code,as_dict=True,check_cache=False)
    # sp_oauth.refresh_access_token(token_info)
    # refresh_token = sp_oauth.is_token_expired(token_info)
    # print("Refresh Token:", token_info['refresh_token'])
    print("Token Info:", token_info)
    session["token_info"] = token_info
    return redirect(url_for("getTracks"))

@app.route('/getTracks')
def getTracks():

    #get_all_played_tracks()
    get_all_liked_songs()
    return render_template("Survery.html")

def get_all_liked_songs():
    token_info = session["token_info"]
    token = token_info['access_token']
    spotify_object = spotipy.Spotify(auth=token)

    # Create a playlist
    user = spotify_object.current_user()
    print("User",user)
    user_id = user['id']
    print("User_id",user_id)
    user_name = user['display_name']
    print("User_name",user_name)
    
    # This is the function for getting all user liked songs, need to change scope to user-library-read
    saved_track = spotify_object.current_user_saved_tracks()

    # This is to get the random of saved_tracks
    y = sample(saved_track['items'],2)

    # This is creating a new playlists
    create_new_playlist= spotify_object.user_playlist_create(user_id,"Testing Playlist 5")

    # For loop to get all the item in y list
    for i in range(2):
        print(y[i]['track']['name'])
        print(y[i]['track']['uri'])

        # Adding tracks item into playlists
        adding_items = spotify_object.playlist_add_items(playlist_id=create_new_playlist['id'],items=[y[i]['track']['uri']])
        
    return 

def get_all_played_tracks():
    # Initialize spotify_object to use for calling function
    token_info = session["token_info"]
    token = token_info['access_token']
    spotify_object = spotipy.Spotify(auth=token)
    all_tracks = []

    while(True):
    
        # Get the track that are currently playing
        length_of_list = len(all_tracks)
        if(length_of_list == 0):
            last_track = "None"
        else:
            last_track = all_tracks[length_of_list-1]
            #print(last_track)
        
        current_track = spotify_object.current_user_playing_track()

        # If some music is playing not idle 
        if(current_track != None):
            current_track_name = current_track['item']['name']
            
            # If there are a new song being played
            if (last_track != current_track_name):
                # Print the name of current playing track
                ct = datetime.datetime.now()
                print("%s:%s:%s"%(ct.hour, ct.minute, ct.second ),"The song is:", current_track_name)
                all_tracks.append(current_track_name)

                # To make sure that there are something in array
                if(length_of_list > 0):

                    # For loop to display all the tracks in array
                    for i in all_tracks:
                        print(i)
            
        else:
            print("No Song is being played")
            time.sleep(2)


def get_token():
    # token_info = session.get(TOKEN_INFO,None)
    # if not token_info:
    #     raise "exception"
    # now = int(time.time())

    # is_expired = token_info['expires_at'] - now < 60
    # if(is_expired):
    #     sp_oauth = create_spotify_oauth()
    #     token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
    # return token_info
    return "TOKEN_INFO"

def create_spotify_oauth():
    return SpotifyOAuth(
        client_id="ce27b5b63fa94b90b98bc7261357473b",
        client_secret="982333282ecf4557ac8391349f257b0b",
        redirect_uri=url_for('account',_external=True),
        scope=["user-library-read playlist-modify-public"]
    )

