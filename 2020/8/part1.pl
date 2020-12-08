use strict;
use warnings;

open(my $in, "<", "input");
my @lines = <$in>;

my $index = 0;
my $acc = 0;
my %visited = ();

while (!exists($visited{$index})) {
  $visited{$index} = 1;
  my $line = $lines[$index];
  print $line;
  if ($line =~ /nop/) {
    $index++;
  }
  if ($line =~ /acc ([+-]\d+)/) {
    $acc += $1;
    $index++;
  }
  if ($line =~ /jmp ([+-]\d+)/) {
    $index += $1;
  }
}
print "$acc \n";
print $lines[$index];
