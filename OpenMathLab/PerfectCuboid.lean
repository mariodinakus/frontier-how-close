import Mathlib
namespace OpenMathLab

structure PerfectCuboid where
  a : ℕ
  b : ℕ
  c : ℕ
  d : ℕ
  e : ℕ
  f : ℕ
  g : ℕ
  ha : 0 < a
  hb : 0 < b
  hc : 0 < c
  hab : a^2 + b^2 = d^2
  hac : a^2 + c^2 = e^2
  hbc : b^2 + c^2 = f^2
  habc : a^2 + b^2 + c^2 = g^2

def NoPerfectCuboid : Prop := ¬ Nonempty PerfectCuboid

abbrev Sq (p : ℕ) (x : ZMod p) : Prop := ∃ y : ZMod p, y^2 = x
abbrev Local (p : ℕ) (a b c : ZMod p) : Prop :=
  Sq p (a^2+b^2) ∧ Sq p (a^2+c^2) ∧
  Sq p (b^2+c^2) ∧ Sq p (a^2+b^2+c^2)

theorem cast_local (p : ℕ) (q : PerfectCuboid) :
    Local p (q.a : ZMod p) (q.b : ZMod p) (q.c : ZMod p) := by
  refine ⟨⟨(q.d : ZMod p), ?_⟩, ⟨(q.e : ZMod p), ?_⟩,
    ⟨(q.f : ZMod p), ?_⟩, ⟨(q.g : ZMod p), ?_⟩⟩
  · simpa only [Nat.cast_add, Nat.cast_pow] using
      congrArg (fun n : ℕ => (n : ZMod p)) q.hab.symm
  · simpa only [Nat.cast_add, Nat.cast_pow] using
      congrArg (fun n : ℕ => (n : ZMod p)) q.hac.symm
  · simpa only [Nat.cast_add, Nat.cast_pow] using
      congrArg (fun n : ℕ => (n : ZMod p)) q.hbc.symm
  · simpa only [Nat.cast_add, Nat.cast_pow] using
      congrArg (fun n : ℕ => (n : ZMod p)) q.habc.symm

set_option maxHeartbeats 0 in
theorem mod3_certificate : ∀ a b c : ZMod 3, Local 3 a b c →
    (a = 0 ∧ b = 0) ∨ (a = 0 ∧ c = 0) ∨ (b = 0 ∧ c = 0) := by
  native_decide

set_option maxHeartbeats 0 in
theorem mod7_certificate : ∀ a b c : ZMod 7, Local 7 a b c →
    a = 0 ∨ b = 0 ∨ c = 0 := by
  native_decide

theorem cuboid_mod7 (q : PerfectCuboid) :
    (q.a : ZMod 7) = 0 ∨ (q.b : ZMod 7) = 0 ∨ (q.c : ZMod 7) = 0 :=
  mod7_certificate _ _ _ (cast_local 7 q)

theorem local_survivor (p : ℕ) : Local p 1 0 0 := by
  refine ⟨⟨1, ?_⟩, ⟨1, ?_⟩, ⟨0, ?_⟩, ⟨1, ?_⟩⟩ <;> simp

#print axioms cast_local
#print axioms mod3_certificate
#print axioms mod7_certificate
#print axioms cuboid_mod7
#print axioms local_survivor

-- Algebraic reduction underlying the divisor search.
theorem factorization_identity (a b d : ℤ) (h : a^2 + b^2 = d^2) :
    (d - b) * (d + b) = a^2 := by
  nlinarith

#print axioms factorization_identity


-- Exact polynomial obstruction for the distinct-prime semiprime case.
theorem semiprime_gap_identity (p q : ℤ) :
    (p * (q^2 - 1))^2 - (q * (p^2 - 1))^2 - (q^2 - p^2)^2 =
      (p^2 - 1) * (q^2 - p^2) * (q^2 + 1) := by
  ring

theorem semiprime_gap_positive (p q : ℤ) (hp : 1 < p) (hq : p < q) :
    0 < (p * (q^2 - 1))^2 - (q * (p^2 - 1))^2 - (q^2 - p^2)^2 := by
  rw [semiprime_gap_identity]
  have hp2 : 0 < p^2 - 1 := by nlinarith
  have hqp : 0 < q^2 - p^2 := by
    have h : 0 < (q-p)*(q+p) := mul_pos (by linarith) (by linarith)
    nlinarith
  have hq2 : 0 < q^2 + 1 := by positivity
  exact mul_pos (mul_pos hp2 hqp) hq2

#print axioms semiprime_gap_identity
#print axioms semiprime_gap_positive

end OpenMathLab
