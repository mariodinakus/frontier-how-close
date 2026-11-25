# Strengthened largest-prime bound for squarefree three-prime odd edges
Status: elementary proof, independently readable; Lean end-to-end verification pending. No claim of novelty.

Theorem: if a primitive perfect cuboid has odd edge a=p*q*r with distinct odd primes p<q<r, then r<p*q.

Put A=p*q and suppose r>A (equality impossible). T=r²>A².
For x=b,c,f, with f²=b²+c², the corresponding divisor d=y-x satisfies 0<d<a and 2x=a²/d-d. All divisors are odd and the function X(d)=(a²/d-d)/2 is strictly decreasing. The divisors for f,b,c are distinct because b=c would force f²=2b². Write w for f, u,v for b,c; w<u,v. Moreover w>1: if w=1 then u,v>=3, so X(u),X(v)<X(1)/3, contradicting the Pythagorean identity.

Since r²>a, each divisor d is either type 0 (d|A²) or type 1 (d=r*s, s|A²). Type 1 occurs exactly when r|x. Primitivity prohibits all three being type 1, and the Pythagorean identity prohibits exactly two type 1.

## Case I: exactly one type 1, one leg (say c)
Then w,u are type 0, distinct, and T divides u²-w² by the doubled-square identity modulo T. Since r divides neither u nor w and is odd, r² divides exactly one of the nonzero even factors u-w,u+w (or at least one; they cannot both be divisible by r). That factor must be at least 2T in absolute value, but u+w<=2A²<2T. Contradiction.

## Case II: exactly one type 1, hypotenuse f
Now w>=r, u,v>w. T divides u²+v² by the doubled-square identity modulo T. Set U=A²/u,V=A²/v, positive odd integers. Multiplying the congruence by (UV)² and cancelling A^4 (coprime to T) shows T|(U²+V²). But 0<U²+V²<2A^4/T<2T. The sum is even, T odd; a positive even multiple of T is at least 2T. Contradiction.

## Case III: no type 1
Set W=A²/w,U=A²/u,V=A²/v and swap b,c if necessary so W>U>V. Substitution gives
K*T²+2A²*T-C=0,
where K=W²-U²-V² and C=u²+v²-w² satisfies 0<C<2A^4. Since T>A², K<0 and K>-2. Hence K=-1, i.e. W²+1=U²+V².
This forces V>1 and W/U<sqrt(2).
All of W,U,V are distinct positive divisors of A², with W<A² since w>1. Thus they belong to {p,q,p²,pq,q²,p²q,pq²}. Among pairs from this set, only the following unordered pairs can have larger/smaller ratio <sqrt(2): {p,q}, {p²,q}, {p²,pq}, {p²,q²}, {pq,q²}, {p²q,q²}, {p²q,pq²}. Every other pair has ratio at least p or q, as direct cancellation shows.

We exclude these seven pairs:
1. {p,q}: V<p impossible.
2. {p²,q}: V<=p, while W²-U²>p²-1, since distinct odd W,U differ by at least 2 and W+U>p².
3. {p²,pq}: p² divides W²-U²=V²-1, and 1<V<p² with V odd. The only roots of 1 modulo an odd prime square p² are ±1; neither gives an odd V in this range.
4. {p²,q²}: V<p² implies V<=q (only p or q can be smaller). Then q^4-p^4>q²>=V², impossible.
5. {pq,q²}: q² divides V²-1, with 1<V<q² and V odd; as in case 3, impossible.
6. {p²q,q²}: same q² divisibility and 1<V<q²; impossible.
7. {p²q,pq²}: q divides W,U, so q cannot divide V by W²+1=U²+V². Hence V<=p². But W²-U²=p²q²(q²-p²)>p^4>=V², impossible.

All cases contradict r>A. Thus r<pq. QED (human-readable derivation; not machine-certified).

## Independent finite regression check
For p<q<=100 the old bound r²<2(pq)² gives 98,161 candidate odd edges; the new bound gives 71,548. Both searches produce zero perfect cuboids. The old bound's 15 primitive Euler bricks surviving the close-divisor filter also survive the new bound, which is not a sufficient condition for perfection. The finite computation is not the proof of the general inequality.

## Scope
The theorem does not exclude balanced triples q<r<pq, nor odd edges with repeated prime factors or at least four distinct primes. Literature context: https://mathworld.wolfram.com/PerfectCuboid.html ; https://unsolvedproblems.org/S58.pdf (published bounded searches already much larger than ours).
