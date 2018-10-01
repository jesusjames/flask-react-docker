import os

from bson import ObjectId
from flask import request, jsonify
from flask_jwt_extended import jwt_required
from modules.app import app, mongo, jwt, urlApi
from modules.app.schemas import validate_historical
from modules.logger import *

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))


@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({
        'ok': False,
        'message': 'Missing Authorization Header'
    }), 401


@app.route(urlApi + '/historical_consumption', methods=['POST'])
@jwt_required
def crear_historical():
    ''' register user endpoint '''
    data = validate_historical(request.get_json())
    if data['ok']:
        data = data['data']
        mongo.db.historical_consumption.insert_one(data)
        return jsonify({'ok': True, 'message': 'Historical_Consumption created successfully!'}), 201
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400


@app.route(urlApi + '/historical_consumption', methods=['GET', 'DELETE'])
@jwt_required
def get_all_data_hisotorical():
    if request.method == 'GET':
        todos_l = mongo.db.historical_consumption.find()
        output = []
        for s in todos_l:
            output.append({'paciente': s['paciente'], 'edad': s['edad'], 'sexo': s['sexo'],
                            'procedimiento': s['procedimiento'], 'producto': s['producto'], 'cantidad': s['cantidad'],
                           '_id': s['_id']})
        return jsonify({'code:': True, 'data': output, 'message': "Lista historical consumption ok"}), 200

    data = request.get_json()
    if request.method == 'DELETE':
        if data.get('_id', None) is not None:
            db_response = mongo.db.historical_consumption.delete_one({'_id': ObjectId(data['_id'])})
            if db_response.deleted_count == 1:
                response = {'ok': True, 'message': 'record deleted'}
            else:
                response = {'ok': True, 'message': 'no record found'}
            return jsonify(response), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400


@app.route(urlApi + '/historical_consumption/<id>', methods=['PUT'])
@jwt_required
def update_historical(id):
    data = request.get_json()
    if request.method == 'PUT':
        mongo.db.historical_consumption.update_one({'_id': ObjectId(id)}, {'$set': data})
        return jsonify({'ok': True, 'message': 'record updated'}), 200
    else:
        return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400


@app.route(urlApi + '/historical_consumption/<code>', methods=['GET'])
@jwt_required
def get_historical(code):
    if request.method == 'GET':
        data = mongo.db.historical_consumption.find_one({'_id': ObjectId(code)})
        historical = {'cantidad': data['cantidad'], 'edad': data['edad'], 'paciente': data['paciente'],
                      'procedimiento': data['procedimiento'], 'producto': data['producto'], 'sexo': data['sexo']}
        return jsonify({'ok': True, 'data': historical}), 200
    else:
        return jsonify({'ok': False, 'data': 'No se pudo obetener el usuario'}), 400