from fabric.api import local

def setup():
    local('npm install -g riot coffeescript stylus')
    
    
def watch():
    local('riot --watch tags riot-wings.js')