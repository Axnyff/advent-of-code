use feature qw(say);
use strict;
use warnings;

open(my $in, "<", "input");
my @lines = <$in>;

sub test_modif {
  my $index = 0;
  my %visited = ();
  my $acc = 0;
  while (!exists($visited{$index})) {
    $visited{$index} = 1;
    if ($index >= $#lines) {
      print "$acc \n";
      exit;
    }
    my $line = $lines[$index];
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
}

for (my $i = 0; $i < $#lines; $i++) {
  my $line = $lines[$i];
  if ($line =~ /nop/) {
    $lines[$i] =~ s/nop/jmp/;
    test_modif();
    $lines[$i] = $line;
    next;
  }
  if ($line =~ /jmp/) {
    $lines[$i] =~ s/jmp/nop/;
    test_modif();
    $lines[$i] = $line;
    next;
  }
}
