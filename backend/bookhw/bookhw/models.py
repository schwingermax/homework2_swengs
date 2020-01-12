from django.db import models


class Author(models.Model):
    name = models.TextField()
    vorname = models.TextField()
    geburtsdatum = models.DateField()
    eyecolour = models.TextField()
    renowned = models.BooleanField()

    def __str__(self):
        return '%s %s (%s)' % (self.name, self.vorname, self.geburtsdatum)


class Publisher(models.Model):
    name = models.TextField()
    responsible = models.TextField(null=True)
    responsible_vorname = models.TextField()
    scientific = models.BooleanField()
    gruendungsdatum = models.DateField()

    def __str__(self):
        return self.name


class Book(models.Model):
    CHOICES = (
        ('t', 'Thriller'),
        ('m', 'Manga')
    )

    title = models.TextField()
    genre = models.CharField(max_length=1, choices=CHOICES, null=True)
    erscheinungsdatum = models.DateField()
    handlung = models.TextField()
    verfügbar = models.BooleanField()
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, null=True)
    author = models.ManyToManyField('Author', related_name='books', blank=True)

    def __str__(self):
        return self.title
