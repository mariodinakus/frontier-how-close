"""Exact symbolic case sieve for a=p*q*r, 3<=p<q<r<pq.
Requires SymPy. Does not claim to solve the remaining cases.
"""
import itertools as it
import sympy as s
from collections import Counter
import json
p,q,r=s.symbols("p q r")
P,Q,R,T=s.symbols("P Q R T")
L=[]
for e in it.product(range(3),repeat=3):
    v=tuple(2-i for i in e)
    if e>=v: continue
    m=lambda e:s.prod(x**i for x,i in zip((p,q,r),e))
    L.append((e,m(v)-m(e),{i for i,j in enumerate(e) if j==1}))
assert len(L)==13
trip=[]
for f in range(1,13):
    for b,c in it.combinations([i for i in range(1,13) if i!=f],2):
        if any(L[i][2]&L[j][2] for i,j in [(f,b),(f,c),(b,c)]):continue
        trip.append((f,b,c))
def sign(poly):
    cs=poly.coeffs()
    return 1 if min(cs)>=0 and max(cs)>0 else -1 if max(cs)<=0 and min(cs)<0 else 0
sq=[s.Poly(x.subs({p:P+3,q:P+Q+3,r:P+Q+R+3}),P,Q,R)**2 for _,x,_ in L]
def stage(cases,squares,sgn):
    left=[]; removed=[]
    for f,b,c in cases:
        if sgn(squares[f]-squares[b])==-1 or sgn(squares[f]-squares[c])==-1:
            removed.append(("order",f,b,c))
        elif sgn(squares[f]-squares[b]-squares[c]):
            removed.append(("gap",f,b,c))
        else:left.append((f,b,c))
    return left,removed
rem,el=stage(trip,sq,sign)
def nondiv(i,j):
    e=L[i][0]
    return e if e[j]==0 else tuple(2-k for k in e)
def small(i,k,j,degree):
    d=[x-y for x,y in zip(nondiv(i,j),nondiv(k,j))]
    return all(d[k]==0 for k in range(j+1,3)) and sum(x for x in d if x>0)<=degree and -sum(x for x in d if x<0)<=degree
rem2=[];el2=[]
for f,b,c in rem:
    if any(small(f,c,j,2) for j in L[b][2]) or any(small(f,b,j,2) for j in L[c][2]):
        el2.append((f,b,c))
    else:rem2.append((f,b,c))
p0=s.Poly(P+3,P,Q,T);q0=s.Poly(P+Q+5,P,Q,T);t0=s.Poly(1+T,P,Q,T)
rn=q0+2+p0*q0*s.Poly(T,P,Q,T)
xs=[]
for e,_,_ in L:
    def term(e):return p0**e[0]*q0**e[1]*rn**e[2]*t0**(2-e[2])
    xs.append((term(tuple(2-k for k in e))-term(e))**2)
def strictsign(poly):
    c=poly.coeff_monomial(1)
    return sign(poly) if c!=0 else 0
rem3,el3=stage(rem2,xs,strictsign)
final=[];el4=[]
for f,b,c in rem3:
    if any(small(b,c,j,1) for j in L[f][2]):el4.append((f,b,c))
    else:final.append((f,b,c))
print(json.dumps(dict(forms=[str(x) for _,x,_ in L],initial=858,after_maximum_form=660,after_disjoint_support=len(trip),order_removed=sum(x[0]=="order" for x in el),gap_removed=sum(x[0]=="gap" for x in el),leg_modular_removed=len(el2),interval_removed=len(el3),hypotenuse_modular_removed=len(el4),remaining=final),indent=2))
