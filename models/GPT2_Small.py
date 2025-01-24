from transformers import GPT2LMHeadModel, GPT2Tokenizer

model_name = "distilgpt2"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

def get_response(prompt):
    #prompt = "Once upon a time"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=50, temperature=0.7, top_k=50, top_p=0.9, no_repeat_ngram_size=2)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    #print(generated_text)
    return generated_text

#print(get_response("Hi"))