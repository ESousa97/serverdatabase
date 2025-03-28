#!/bin/bash
# Atualiza os repositórios e instala o python3-distutils
apt-get update && apt-get install -y python3-distutils
# Executa a instalação dos pacotes e o rebuild do sqlite3
npm install
npm rebuild sqlite3 --build-from-source
