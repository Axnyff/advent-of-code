fd := FileDescriptor open: 'test-input'.
stream := fd contents.
contents printNl.
