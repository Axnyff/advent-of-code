use strict;
use warnings;

open(my $input_fh, '<', './input');
my $text = join('', <$input_fh>);


my @matches = $text =~ /mul\(\d+,\d+\)/g;

my $total = 0;
for my $el (@matches) {
  my @content = $el =~ /(\d+),(\d+)/;
  $total += $content[0] * $content[1];
  # print("$el\n");
}
print("$total\n");

my $enabled = 1;

my $i = 0;
my $total2 = 0;
while ($i < length($text)) {
  my $sub = substr $text, $i;


  if ($sub =~ /^do\(\)/) {
    $enabled = 1;
  }
  if ($sub =~ /^don't\(\)/) {
    $enabled = 0;
  }

  my @match = $sub =~ /^mul\((\d+),(\d+)\)/;
  if (@match && $enabled) {
    $total2 += $match[0] * $match[1];
  }

  $i++;
}
print("$total2\n");
