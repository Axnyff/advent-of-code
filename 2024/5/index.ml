let read_file file =
  In_channel.with_open_bin file In_channel.input_all
read_file "test-input"
