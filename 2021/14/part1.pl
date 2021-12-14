use warnings;
use strict;
no warnings ('substr');

my $filename = 'input';

open(FH, '<', $filename) or die $!;

my %data = ();
my @lines = ();
while(<FH>) {
  my $item = $_;
  $item =~ s/\n//;
  push @lines, $item;
}
close(FH);
my $input = shift @lines;
$input =~ s/\s//;

shift @lines;

foreach (@lines) {
  my @x = split(" -> ", $_);
  $data{$x[0]} = $x[1];
}
my @range = (1..10);
for (@range) {
  my $new_input = '';

  while (length($input) > 1) {
    my $identifier = substr $input, 0, 2;
    my $target = $data{$identifier};
    $input = (substr $input, 1) || '';
    $new_input = $new_input . (substr $identifier, 0, 1) . $target;
  }
  $new_input = $new_input . $input;
  $input = $new_input;
}

my %counts = ();
foreach (split "", $input) {
  $counts{$_} = exists($counts{$_}) ? $counts{$_} + 1 : 1;
}
my $min = 5000;
my $max = 0;

foreach(keys %counts) {
  my $value = $counts{$_};
  if ($value > $max) {
    $max = $value;
  }
  if ($value < $min) {
    $min = $value;
  }
}

print $max - $min . "\n";
