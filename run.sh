#!/bin/bash

open_in_browser() {
    # just to wait a little
    ping -c 3 127.0.0.1 >> /dev/null 
    # open the link
    open http://127.0.0.1:8000
}
#open_in_browser

# run a simple local http server for testing purposes
python3 -m http.server -b 127.0.0.1 -d .
