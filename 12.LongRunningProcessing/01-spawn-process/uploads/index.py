import sys 
import json
from urllib import request
import os

def main():
  item = json.loads(sys.argv[1])
  url = item.get('url')
  
  # working directory is the uploads folder
  working_dir = os.path.dirname(os.path.realpath(__file__))
  filepath = os.path.join(working_dir, item.get('filename'))
  print('filepath: ',filepath)
  data = open(filepath, 'rb').read()
  req = request.Request(url, data)
  res = request.urlopen(req).read().decode('utf-8')
  print(res)
if __name__ == '__main__':
  main()