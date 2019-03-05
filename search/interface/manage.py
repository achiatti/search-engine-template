#!/usr/bin/env python
from django.core.management import execute_manager
#from django.core.management import execute_from_command_line
import imp
import sys

try:
    imp.find_module('settings') # Assumed to be in the same directory.
except ImportError:
    import sys
    sys.stderr.write("Error: Can't find the file 'settings.py' in the directory containing %r. It appears you've customized things.\nYou'll have to run django-admin.py, passing it your settings module.\n" % __file__)
    sys.exit(1)

import settings
#import sys
if __name__ == "__main__":
    #execute_from_command_line(sys.argv)
    execute_manager(settings)

