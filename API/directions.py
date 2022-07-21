from flask_cors import CORS
from pymongo import MongoClient

import backend.Functions as callMethod

import backend.GlobalInfo.Keys as PracticaKeys

import backend.GlobalInfo.Helpers as HelperFunctions

import backend.GlobalInfo.ResponseMessages as ResponseMessage

from flask import Flask, jsonify, request, url_for, Response
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/general/send', methods=['POST'])
def postVehicle():
    try:
        vehicle = request.json['vehicle']
        ctrPlacas = vehicle['ctrPlacas']
        ctrTelefono = vehicle['ctrTelefono']
        ctrGafete = vehicle['ctrGafete']
        ctrNombre = vehicle['ctrNombre']
        ctrCelular = vehicle['ctrCelular']
        ctrDireccion = vehicle['ctrDireccion']
        ctrColor = vehicle['ctrColor']
        ctrMarca = vehicle['ctrMarca']
        ctrDescripcion = vehicle['ctrDescripcion']
        ctrTipo = vehicle['ctrTipo']
        ctrImagenFrente = vehicle['ctrImagenFrente']
        ctrImagenAtras = vehicle['ctrImagenAtras']
        objResult = callMethod.fnNewVehicle(
            ctrPlacas,ctrTelefono,ctrGafete,ctrNombre,
            ctrCelular,ctrDireccion,ctrColor,ctrMarca,
            ctrDescripcion,ctrTipo,ctrImagenFrente,ctrImagenAtras
        )
        return objResult
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

@app.route('/api/general/<IDplacas>', methods=['GET'])
def getVehicle(IDplacas):
    try:
        print(IDplacas)
        objResult = callMethod.getDataVehicle(IDplacas)
        return objResult
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err206)

@app.route('/api/general/update', methods=['PUT'])
def putVehicle():
    try:
        vehicle = request.json['vehicle']
        ctrPlacas = vehicle['ctrPlacas']
        ctrTelefono = vehicle['ctrTelefono']
        ctrGafete = vehicle['ctrGafete']
        ctrNombre = vehicle['ctrNombre']
        ctrCelular = vehicle['ctrCelular']
        ctrDireccion = vehicle['ctrDireccion']
        ctrColor = vehicle['ctrColor']
        ctrMarca = vehicle['ctrMarca']
        ctrDescripcion = vehicle['ctrDescripcion']
        ctrTipo = vehicle['ctrTipo']
        ctrImagenFrente = vehicle['ctrImagenFrente']
        ctrImagenAtras = vehicle['ctrImagenAtras']
        objResult = callMethod.fnUpdateVehicle(
            ctrPlacas,ctrTelefono,ctrGafete,ctrNombre,
            ctrCelular,ctrDireccion,ctrColor,ctrMarca,
            ctrDescripcion,ctrTipo,ctrImagenFrente,ctrImagenAtras
        )
        return objResult
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

@app.route('/api/general/send/<IDplacas>', methods=['POST'])
def postEntry(IDplacas):
    try:
        entry = request.json['entry']
        ctrFecha = entry['ctrFecha']
        ctrHora = entry['ctrHora']
        ctrTipoIngreso = entry['ctrTipoIngreso']
        ctrNotas = entry['ctrNotas']
        estado = entry['estado']
        objResult = callMethod.fnNewEntry(
            ctrFecha,ctrHora,ctrTipoIngreso,ctrNotas,estado,IDplacas)
        
        return objResult
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9005, debug=True, threaded=True)
