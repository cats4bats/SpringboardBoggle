from boggle import Boggle
from flask import Flask, render_template, session, request, jsonify
import json

boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'hello'
high_score = 0
num_played = 0

@app.route('/boggle')
def boggle_board():
    """Displays the board and guess form to user
    """
    board = session.get('board', boggle_game.make_board())
    session['board'] = board
    return render_template('board.html', board=board)

@app.route('/boggle-form', methods=['POST'])
def boggle_form():
    """Handles the POST request for making a request on the board and returns a JSON object with the results
    """
    board = session['board']
    guess = json.loads(request.data).get('guess')
    test = boggle_game.check_valid_word(board, guess)
    return jsonify(result=test)

@app.route('/boggle-stats', methods=['POST'])
def boggle_stats():
    """Updates the stats on the server for number of times played and best score
    """
    global high_score
    global num_played
    if high_score < request.json.get('new_score'):
        high_score = request.json.get('new_score')
    num_played += 1
    return jsonify(best_score=high_score, times_played=num_played)
