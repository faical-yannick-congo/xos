#if [[ ! -e ./vbng-observer.py ]]; then
#    ln -s ../../xos-observer.py vbng-observer.py
#fi

export XOS_DIR=/opt/xos
nohup python vbng-observer.py  -C $XOS_DIR/observers/vbng/vbng_observer_config > /dev/null 2>&1 &
