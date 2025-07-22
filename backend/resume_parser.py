import spacy
nlp = spacy.load("en_core_web_sm")

def parse_resume(text):
    doc = nlp(text.decode("utf-8"))
    return {
        "entities": [(ent.text, ent.label_) for ent in doc.ents]
    }
