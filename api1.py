from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URL'] = 'sqlite:///database.db'
db = SQLAlchemy(app)


class VideoModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    views = db.Column(db.Integer, nullable=False)
    likes = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Video (name={self.name}, views={self.views}, likes={self.likes})"


video_put_args = reqparse.RequestParser()
video_put_args.add_argument("name", type=str, help='Name of the video')
video_put_args.add_argument("like", type=int, help='Likes of the video')
video_put_args.add_argument("views", type=int, help='Views of the video')


videos = {}


def abort_if_video_does_not_exist(video_id):
    if video_id not in videos:
        abort(404, message="Video does not exist")


def abort_if_video_does_exist(video_id):
    if video_id not in videos:
        abort(409, message="Video already exist with that id ")


class video(Resource):

    def get(self, video_id):
        abort_if_video_does_not_exist(video_id)
        return videos[video_id]

    def put(self, video_id):
        abort_if_video_does_exist(video_id)
        args = video_put_args.parse_args()
        return {video_id: args}


api.add_resource(video, "/video/<int:video_id>")


if __name__ == "__main__":
    app.run(debug=True)
