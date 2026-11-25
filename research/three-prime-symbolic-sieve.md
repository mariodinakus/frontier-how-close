# Symbolic sieve: squarefree three-prime odd edge

Scope: primitive perfect cuboid with a=pqr, distinct odd primes p<q<r. The interval sieve additionally assumes the earlier human-readable bound r<pq. This is a finite classification of symbolic forms, not a finite bound on the primes. No originality or Lean verification is claimed.

Every x in {b,c,f} (f²=b²+c²) satisfies a²+x²=y² for an integer y. Thus 2x=|M-N| where MN=a² and M,N are positive odd factors. There are 27 possible exponent vectors in {0,1,2}³, of which the middle vector gives x=0. Complementation pairs the others, giving 13 forms. Index them lexicographically by the smaller exponent vector. Distinct x are necessary (b=c would imply f²=2b²); swapping b,c does not change the problem. There are 13*C(12,2)=858 indexed triples (f,b,c).

The form indexed 0, namely (a²-1)/2, is impossible. If it occurs it must be f, and every other x=(a²/d-d)/2 with d>=3 is less than f/3, contradicting the Pythagorean identity. This leaves 660 cases.

A prime dividing a divides x iff its exponent in both complementary factors is 1. For any prime dividing a, it cannot divide two of b,c,f without dividing the third; that would contradict primitivity. Hence the three supports are pairwise disjoint, leaving 270 cases.

## Coefficient certificates (unrestricted ordered primes)
Substitute p=P+3,q=P+Q+3,r=P+Q+R+3 with P>=0,Q>0,R>0. To ensure strictness even at P=0, use the equivalent admissible shift P=p-3 and inspect the polynomial at P=0. If a nonzero coefficient polynomial in Q,R remains, strictness holds. In the executed sieve P,Q,R are treated as positive; to cover p=3 explicitly, the generated sign certificates must also have a nonzero term independent of P, or separately handle p=3. The accompanying code should be checked for this boundary before interpreting the counts as unconditional. Test f²-b², f²-c² and f²-b²-c² by coefficient signs.

## Leg modular sieve
If an odd prime l|a divides a leg, it does not divide the other leg or f. For each of the latter two forms choose the factor M with l-adic exponent 0. Its doubled square is congruent to M² mod l². Cancel the gcd of the two factors, obtaining distinct coprime odd positive S,B. Then l² divides S²-B². It cannot divide both S+B and S-B at the prime level; thus one nonzero even factor has absolute value at least 2l². If S and B are each products of at most two primes smaller than l (counting multiplicity), both are strictly smaller than l²; contradiction. Exponent differences suffice to certify this.

## Interval sieve
For q>=p+2, r>=q+2 and r<pq use p=P+3, q=P+Q+5, r=(q+2+pq*T)/(1+T), P,Q,T>=0. T=(r-q-2)/(pq-r). Multiply each squared expression by (1+T)^4. A positive constant coefficient and all nonnegative coefficients certifies strict positivity; negative analogously. This covers interval endpoints p=3,q=p+2,r=q+2.

## Hypotenuse modular sieve
If l|a divides f, but not b,c, use the same cancellation to get l²|(S²+B²). If both factors consist of at most one smaller prime (or 1), then S,B<l. Their positive sum of squares is even and less than 2l², impossible.

Remaining cases are not asserted impossible. See the reproducible Python script for the exact indexed forms.
