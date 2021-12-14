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
my $last = substr $input, -1;
$input =~ s/\s//;

shift @lines;

foreach (@lines) {
  my @x = split(" -> ", $_);
  $data{$x[0]} = $x[1];
}

my %counts = ();
while (length($input) > 1) {

  my $identifier = substr $input, 0, 2;
  $counts{$identifier} = exists($counts{$identifier}) ? $counts{$identifier} + 1 : 1;
  $input = (substr $input, 1) || '';
}
my @range = (1..40);
for (@range) {
  my %new_counts = ();

  foreach(keys %counts) {
    my $target = $data{$_};
    my $left = substr($_, 0, 1) . $target;
    my $right = $target . substr($_, 1, 2);
    my $value = $counts{$_};
    $new_counts{$left} = exists($new_counts{$left}) ? $new_counts{$left} + $value : $value;
    $new_counts{$right} = exists($new_counts{$right}) ? $new_counts{$right} + $value : $value;
  }
  %counts = %new_counts;
}

my $min = 9 ** 9 ** 9;
my $max = 0;


my %real_counts = ($last, 1);

foreach(keys %counts) {
  my $left = substr($_, 0, 1);
  my $value = $counts{$_};
  $real_counts{$left} = exists($real_counts{$left}) ? $real_counts{$left} + $value : $value;
}


foreach(keys %real_counts) {
  my $value = $real_counts{$_};
  if ($value > $max) {
    $max = $value;
  }
  if ($value < $min) {
    $min = $value;
  }
}

print $max - $min . "\n";
