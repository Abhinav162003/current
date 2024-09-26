import pandas as pd
from torch.utils.data import DataLoader
from loader import AudioDataset, custom_collate_fn
from transformers import Wav2Vec2ForCTC, Wav2Vec2Tokenizer
import torch

def create_dataloader(csv_file_path, audio_dir, batch_size=4):
    # Load the labels from the CSV file
    df = pd.read_csv(csv_file_path)

    # Convert the DataFrame to a list of strings for labels
    labels = df['enWord'].tolist()  # Use the correct column for labels

    # Create the dataset
    dataset = AudioDataset(audio_dir, labels)

    # Create the DataLoader with a custom collate function
    dataloader = DataLoader(dataset, batch_size=batch_size, collate_fn=custom_collate_fn, shuffle=True)
    
    return dataloader

# Paths
csv_file_path = '/content/drive/My Drive/Colab_Notebooks/data/a.csv'  # Adjust path if necessary
audio_dir = '/content/drive/My Drive/Colab_Notebooks/data/converted_audio/'  # Adjust if needed

# Create the DataLoader
dataloader = create_dataloader(csv_file_path, audio_dir, batch_size=4)

# Load pre-trained model and tokenizer
tokenizer = Wav2Vec2Tokenizer.from_pretrained("facebook/wav2vec2-base-960h")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")

# Set the model to training mode
model.train()

# Define an optimizer
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-5)

# Check if GPU is available and move model to GPU if so
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Example training loop
num_epochs = 3  # Set number of epochs
for epoch in range(num_epochs):
    for batch in dataloader:
        # Ensure to unpack correctly
        waveforms, sample_rates, labels = batch

        # Move tensors to the appropriate device
        waveforms = waveforms.to(device)
        
        # Tokenize inputs and labels
        inputs = tokenizer(waveforms.numpy(), return_tensors="pt", padding=True, truncation=True).to(device)
        labels = tokenizer(labels, return_tensors="pt", padding=True, truncation=True).input_ids.to(device)

        # Forward pass
        outputs = model(input_values=inputs.input_values, attention_mask=inputs.attention_mask, labels=labels)
        loss = outputs.loss

        # Backward pass
        optimizer.zero_grad()  # Zero gradients
        loss.backward()  # Backpropagation
        optimizer.step()  # Update weights

        print(f"Epoch: {epoch + 1}, Loss: {loss.item()}")

# Save the trained model
model.save_pretrained('./trained_model')
tokenizer.save_pretrained('./trained_model')
