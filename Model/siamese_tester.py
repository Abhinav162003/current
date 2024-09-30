import os
import pandas as pd
import torch
import torchaudio
from torch.utils.data import DataLoader, Dataset

# ---------------------------------------------------
# Section 1: Dataset Class Definition for Test Set
# ---------------------------------------------------
class AudioTestDataset(Dataset):
    def __init__(self, audio_dir, labels):
        self.audio_dir = audio_dir
        self.labels = labels

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        label = self.labels[idx]
        audio_path = os.path.join(self.audio_dir, f"{label}.wav")

        waveform, sample_rate = torchaudio.load(audio_path)

        if waveform.shape[0] > 1:
            waveform = torch.mean(waveform, dim=0, keepdim=True)

        target_length = 160000
        original_size = waveform.size(1)

        if original_size < target_length:
            padding = target_length - original_size
            waveform = torch.nn.functional.pad(waveform, (0, padding))
        else:
            waveform = waveform[:, :target_length]

        return waveform, label

# ---------------------------------------------------
# Section 2: Load the Model
# ---------------------------------------------------
class SiameseNetwork(nn.Module):
    # (Define your SiameseNetwork class here as in your training script)

    def __init__(self):
        super(SiameseNetwork, self).__init__()
        self.conv1 = nn.Conv1d(1, 32, kernel_size=5)
        self.pool = nn.MaxPool1d(2)
        self.conv2 = nn.Conv1d(32, 64, kernel_size=5)

        self.fc1_input_size = self._get_fc1_input_size()
        self.fc1 = nn.Linear(self.fc1_input_size, 256)
        self.fc2 = nn.Linear(256, 128)

    def _get_fc1_input_size(self):
        x = torch.zeros(1, 1, 160000)
        x = self.pool(nn.functional.relu(self.conv1(x)))
        x = self.pool(nn.functional.relu(self.conv2(x)))
        return x.numel()

    def forward_one(self, x):
        x = self.pool(nn.functional.relu(self.conv1(x)))
        x = self.pool(nn.functional.relu(self.conv2(x)))
        x = x.view(x.size(0), -1)
        x = nn.functional.relu(self.fc1(x))
        x = self.fc2(x)
        return x

    def forward(self, input1, input2):
        output1 = self.forward_one(input1)
        output2 = self.forward_one(input2)
        return output1, output2

# ---------------------------------------------------
# Section 3: Test the Model
# ---------------------------------------------------
def test_model(test_loader, model, device):
    model.eval()
    total_correct = 0
    total_samples = 0

    with torch.no_grad():
        for waveform1, waveform2, labels in test_loader:
            waveform1, waveform2 = waveform1.to(device), waveform2.to(device)
            labels = labels.float().to(device)

            output1, output2 = model(waveform1, waveform2)
            predictions = (torch.nn.functional.pairwise_distance(output1, output2) < 0.5).float()  # Adjust threshold as needed

            total_correct += (predictions == labels).sum().item()
            total_samples += labels.size(0)

    accuracy = total_correct / total_samples
    print(f"Test Accuracy: {accuracy * 100:.2f}%")

# ---------------------------------------------------
# Section 4: Main Function (Setup and Execution)
# ---------------------------------------------------
if __name__ == "__main__":
    test_audio_dir = '/content/drive/My Drive/Colab_Notebooks/data/test_set/'  # Update to your test set path
    csv_file_path = '/content/drive/My Drive/Colab_Notebooks/data/a.csv'
    
    # Load labels from the CSV
    df = pd.read_csv(csv_file_path)
    labels = df['enWord'].tolist()

    # Create test dataset and loader
    test_dataset = AudioTestDataset(test_audio_dir, labels)
    test_loader = DataLoader(test_dataset, batch_size=2, shuffle=False)

    # Load the trained model
    model = SiameseNetwork()
    model.load_state_dict(torch.load('./trained_siamese_model.pth'))  # Update the path if needed
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    # Test the model
    test_model(test_loader, model, device)
