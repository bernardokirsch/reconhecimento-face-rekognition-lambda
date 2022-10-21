from typing import Collection
import boto3
import json

s3 = boto3.resource('s3')
client = boto3.client('rekognition')

def detecta_faces():
    faces_detectadas = client.index_faces(
        CollectionId = 'faces',
        DetectionAttributes = ['DEFAULT'],
        ExternalImageId = 'TEMP',
        Image = {
            'S3Object': {
                'Bucket': 'bernardo-imagens',
                'Name': 'analise.png',
            },
        },
    )
    return faces_detectadas

def lista_faceId_detectadas(faces_detectadas):
    faceId_detectadas = []
    for imagens in range(len(faces_detectadas['FaceRecords'])):
        faceId_detectadas.append(faces_detectadas['FaceRecords'][imagens]['Face']['FaceId'])
    return faceId_detectadas

def compara_imagens(faceId_detectadas):
    resultado_comparacao = []
    for id in faceId_detectadas:
        resultado_comparacao.append(
            client.search_faces(
                CollectionId = 'faces',
                FaceId = id,
                FaceMatchThreshold = 97, # porcentagem de similaridade
                MaxFaces = 10,
            )
        )
    return resultado_comparacao

faces_detectadas = detecta_faces()
faceId_detectadas = lista_faceId_detectadas(faces_detectadas)
resultado_comparacao = compara_imagens(faceId_detectadas)
print(json.dumps(resultado_comparacao, indent = 4))