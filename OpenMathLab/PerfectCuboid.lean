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
end OpenMathLab
