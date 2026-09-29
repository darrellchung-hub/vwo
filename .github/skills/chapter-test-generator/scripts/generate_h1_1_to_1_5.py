import ast
from pathlib import Path


ROOT = Path(__file__).resolve().parents[4]
OUTPUT = ROOT / "output" / "History" / "World-War-I"


def load_assignments(path):
    tree = ast.parse(Path(path).read_text(encoding="utf-8"))
    selected = []
    for node in tree.body:
        if isinstance(node, ast.FunctionDef) and node.name in {"q", "make_markdown"}:
            selected.append(node)
        elif isinstance(node, ast.Assign) and any(
            isinstance(target, ast.Name) and target.id in {"PASS", "EXCELLENT"}
            for target in node.targets
        ):
            selected.append(node)
    namespace = {"Path": Path, "OUTPUT": OUTPUT}
    for node in selected:
        exec(compile(ast.Module(body=[node], type_ignores=[]), str(path), "exec"), namespace)
    return namespace


h1 = load_assignments(ROOT / ".github/skills/chapter-test-generator/scripts/generate_h1_tests.py")
h12_to_15 = load_assignments(ROOT / ".github/skills/chapter-test-generator/scripts/generate_h1_1_2_to_1_5.py")

h1_pass = [item for item in h1["PASS"] if "§1.1" in item["source"]]
h1_excellent = [item for item in h1["EXCELLENT"] if "§1.1" in item["source"]]

PASS = h1_pass[0:8] + h12_to_15["PASS"][0:4] + h12_to_15["PASS"][12:20]
EXCELLENT = h1_excellent[0:4] + [h1["PASS"][12]] + h12_to_15["EXCELLENT"][1:11]


def renumber(questions):
    for number, item in enumerate(questions, start=1):
        item["number"] = number
    return questions


PASS = renumber(PASS)
EXCELLENT = renumber(EXCELLENT)

OUTPUT.mkdir(parents=True, exist_ok=True)
make_markdown = h12_to_15["make_markdown"]
make_markdown("History_H1_1.1-1.5_Test-A_Pass.md", "H1 World War I 1.1-1.5 - Test A / Pass level", PASS, chapter="1.1-1.5")
make_markdown("History_H1_1.1-1.5_Test-B_Excellent.md", "H1 World War I 1.1-1.5 - Test B / Excellent level", EXCELLENT, chapter="1.1-1.5")
make_markdown("History_H1_1.1-1.5_Test-A_Pass_AnswerKey.md", "H1 World War I 1.1-1.5 - Test A / Pass level - Answer key", PASS, answer_key=True, chapter="1.1-1.5")
make_markdown("History_H1_1.1-1.5_Test-B_Excellent_AnswerKey.md", "H1 World War I 1.1-1.5 - Test B / Excellent level - Answer key", EXCELLENT, answer_key=True, chapter="1.1-1.5")
print("Created tests and standalone answer keys in", OUTPUT)