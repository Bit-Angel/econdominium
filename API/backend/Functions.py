from flask import Flask, jsonify, request, Response
from pymongo import MongoClient
from bson.objectid import ObjectId

import base64

import backend.GlobalInfo.ResponseMessages as ResponseMessage

import backend.GlobalInfo.Keys as PracticaKeys

import backend.GlobalInfo.Helpers as HelperFunctions
import json
import datetime
import time

from bson import ObjectId, json_util

dbConnLocal = None

# Connection to database
if PracticaKeys.dbconn == None:
	mongoConnect = MongoClient(PracticaKeys.strConnection)
	PracticaKeys.dbconn = mongoConnect[PracticaKeys.strDBConnection]
	dbConnLocal = PracticaKeys.dbconn
print(dbConnLocal)

######################################################################################
#
#                               fnNewVehicle()
#
######################################################################################
def fnNewVehicle(ctrPlacas,ctrTelefono,ctrGafete,ctrNombre,ctrCelular,ctrDireccion,ctrColor,ctrMarca,ctrDescripcion,ctrTipo,ctrImagenFrente,ctrImagenAtras):
	try:
		jsnQuery = {
			"IDplacas" : ctrPlacas,
			"name" : ctrNombre,
			"phone" : ctrTelefono,
			"cellphone" : ctrCelular,
			"addres": ctrDireccion,
			"description":ctrDescripcion,
			"type":ctrTipo,
			"brand":ctrMarca,
            "color":ctrColor,
			"gafete":ctrGafete,		
            "frontImage":ctrImagenFrente,
            "backImage":ctrImagenAtras
		    } 
		arrVehicle = dbConnLocal.vehicles.insert_one(jsnQuery)
		
		print (arrVehicle.acknowledged,arrVehicle.inserted_id)
		
		response = {
			"acknowledged":arrVehicle.acknowledged,
			"_id":arrVehicle.inserted_id
			}

		response = json_util.dumps(response)
		
		return Response(response,mimetype='application/json')

	except Exception as e:
		HelperFunctions.PrintException()
		response = {
			"acknowledged":False
			}
		response = json_util.dumps(response)
		return Response(response,mimetype='application/json')
######################################################################################
#
#                               getDataVehicle()
#
######################################################################################
def getDataVehicle(IDplacas):
	try:
		jsnQuery = {"IDplacas":IDplacas}
		arrVehicles = list(dbConnLocal.vehicles.find(jsnQuery))
		response = json_util.dumps(arrVehicles)
		return Response(response,mimetype='application/json')

	except Exception as e:
		HelperFunctions.PrintException()
		return []
######################################################################################
#
#                               fnUpdateVehicle()
#
######################################################################################
def fnUpdateVehicle(ctrPlacas,ctrTelefono,ctrGafete,ctrNombre,ctrCelular,ctrDireccion,ctrColor,ctrMarca,ctrDescripcion,ctrTipo,ctrImagenFrente,ctrImagenAtras):
	try:
		jsnQuery = {
			"$set":{
				"IDplacas" : ctrPlacas,
				"name" : ctrNombre,
				"phone" : ctrTelefono,
				"cellphone" : ctrCelular,
				"addres": ctrDireccion,
				"description":ctrDescripcion,
				"type":ctrTipo,
				"brand":ctrMarca,
				"color":ctrColor,
				"gafete":ctrGafete,		
				"frontImage":ctrImagenFrente,
				"backImage":ctrImagenAtras
				}
		    } 
		jsnCondition = {"IDplacas":ctrPlacas}
		arrVehicle = dbConnLocal.vehicles.update_one(jsnCondition,jsnQuery)
		print (arrVehicle.acknowledged,arrVehicle.upserted_id)
		response = {
			"acknowledged":arrVehicle.acknowledged,
			"_id":arrVehicle.upserted_id
			}
		response = json_util.dumps(response)
		return Response(response,mimetype='application/json')

	except Exception as e:
		HelperFunctions.PrintException()
		response = {
			"acknowledged":False
			}
		response = json_util.dumps(response)
		return Response(response,mimetype='application/json')
######################################################################################
#
#                               fnNewEntry()
#
######################################################################################
def fnNewEntry(ctrFecha,ctrHora,ctrTipoIngreso,ctrNotas,estado,IDplacas):
	# DB.coleccion.update({condición}, {“$push”:{“campo”: {arreglo}}}} 
	print(ctrFecha,ctrHora,ctrTipoIngreso,ctrNotas,estado,IDplacas)
	try:
		date = ctrFecha.split("-")
		print(date)
		time = ctrHora.split(":")
		print(time)
		jsonQuery = {
			"$push":{
				"entries":{
					"estatus":estado,
					"date-time":datetime.datetime(int(date[0]),int(date[1]),int(date[2]),int(time[0]),int(time[1])),
					"type":ctrTipoIngreso,
					"notes":ctrNotas
				}
			}
		}
		jsonCondition = {"IDplacas":IDplacas}
		arrVehicle = dbConnLocal.vehicles.update_one(jsonCondition,jsonQuery)
		print (arrVehicle.acknowledged,arrVehicle.upserted_id)
		response = {
			"acknowledged":arrVehicle.acknowledged,
			"_id":arrVehicle.upserted_id
			}
		response = json_util.dumps(response)
		return Response(response,mimetype='application/json')
	except Exception as e:
		HelperFunctions.PrintException()
		response = {
			"acknowledged":False
			}
		response = json_util.dumps(response)
		return Response(response,mimetype='application/json')