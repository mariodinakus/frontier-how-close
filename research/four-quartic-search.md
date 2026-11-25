# Four residual quartics: exact quadratic search

Conditional on the earlier reduction to four canonical equations; not a general nonexistence theorem or a Lean-certified result. No novelty claim.

## Bounds and derivations

1. Equation (p^4+q^4)(r^4+1)=r^2(p^2q^2+1)^2 implies q^4 r^4<r^2(p^2q^2+1)^2, hence r<p^2+1/q^2. As r is prime, r<p^2. Also r^2 divides p^4+q^4, so the element p/q modulo r has fourth power -1 and order 8, hence r=1 mod 8.
2. Equation (q^4-p^4)(r^4-1)=(p^2q^2-r^2)^2, with q<r<pq, gives (q^4-p^4)q^4<p^4q^4, so q^4<2p^4. Modulo q and r respectively the equation also implies p^4+1=(p/r)^4 mod q and p^4+1=(p/q)^4 mod r.
3. Equation (p^4+1)(q^4+r^4)=p^2r^2(q^2+1)^2 gives r^2|p^4+1 because r does not divide q. Since this integer is even and r odd, r^2< p^4, so r<p^2.
4. Equation (p^4+1)(q^4+r^4)=p^2q^2(r^2+1)^2 gives q^2|p^4+1. Dividing by r^4, the LHS is strictly less than 2(p^4+1) and the RHS strictly exceeds p^2q^2. Thus q^2<2p^2+2/p^2. Integrality and irrationality of sqrt(2) imply q^2<2p^2.

## Algorithm

Set x=p^2,y=q^2,w=r^2. Solve for one of the squared variables by exact discriminant, exact integer division and integer square root. The four coefficient triples in order are:
1. (x^2+y^2,-(xy+1)^2,x^2+y^2) for w.
2. (y^2-x^2-1,2xy,-(y^2-x^2)-x^2 y^2) for w.
3. (x^2+1-xw,-2xw,(x^2+1)w^2-xw) for y.
4. (x^2+1-xy,-2xy,(x^2+1)y^2-xy) for w.

Cases 3 and 4 first factor p^4+1 and enumerate its prime-square divisors. All computations are exact Python integers with SymPy prime enumeration/factorization. No bound is imposed on r except the necessary mathematical bounds. Search is exhaustive for p<=N within the four-equation conditional reduction.

## Executed results
N=503: 95 odd primes, 680915 and 643 quadratics in cases 1 and 2, no eligible prime-square divisors in cases 3/4, no integer roots.
N=1009: 168 odd primes, 4183686 and 2150 quadratics in cases 1 and 2, no eligible prime-square divisors in cases 3/4, no integer roots. Conditional bound p>1009. Not an unbounded proof. The four cases remain open.
